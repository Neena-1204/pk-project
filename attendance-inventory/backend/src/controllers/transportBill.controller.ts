import { Request, Response } from "express";
import { TransportBillService } from "../services";
import { TransportBill } from "../models";
import { getPagingData } from "../helpers";
import { TransportBillItem } from "../models/transport-bill-item";
import { sequelize } from "../db";

export class TransportBillController {
  private transportBillService: TransportBillService;

  constructor() {
    this.transportBillService = new TransportBillService(TransportBill);
  }

  options = {
    include: [
      {
        model: TransportBillItem,
        as: "goods",
      },
    ],
  };

  getPaged(req: Request, res: Response) {
    const { page, size } = req.query;
    this.transportBillService
      .getPaged(page, size, this.options)
      .then((transportBill) =>
        res.status(200).json(getPagingData(transportBill))
      );
  }

  getAll(req: Request, res: Response) {
    this.transportBillService
      .getAll()
      .then((transportBill) => res.status(200).json(transportBill));
  }

  getById(req: Request, res: Response) {
    this.transportBillService
      .get(req.params.id, this.options)
      .then((transportBill) => {
        if (transportBill) res.status(200).json(transportBill);
        else
          res.status(404).json({
            message: `TransportBill id:${req.params.id} does not exists`,
          });
      });
  }

  async post(req: Request, res: Response) {
    let {
      consigneeName,
      rcNo,
      gstin,
      date,
      purpose,
      vehicleType,
      vehicleNo,
      from,
      to,
      purchaseOrderNo,
      exciseNo,
      remarks,
      goods,
    } = req.body;
    let transportBill = new TransportBill({
      consigneeName,
      rcNo,
      gstin,
      date,
      purpose,
      vehicleType,
      vehicleNo,
      from,
      to,
      purchaseOrderNo,
      exciseNo,
      remarks,
    });
    const t = await sequelize.transaction();

    TransportBill.create(transportBill.dataValues, { transaction: t })
      .then((transportBill) => {
        let updatedGoods = goods.map((item: any) => {
          delete item.id;
          return { ...item, billId: transportBill.dataValues.id };
        });
        TransportBillItem.bulkCreate(updatedGoods, { transaction: t })
          .then((items) => {
            t.commit();
            res.status(201).json(transportBill);
          })
          .catch((err) => {
            console.log(err);
            t.rollback();
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        t.rollback();
        res.status(400).json(err);
      });
  }

  update(req: Request, res: Response) {
    let {
      id,
      consigneeName,
      rcNo,
      gstin,
      date,
      purpose,
      vehicleType,
      vehicleNo,
      from,
      to,
      purchaseOrderNo,
      exciseNo,
      remarks,
      goods,
    } = req.body;

    this.transportBillService
      .get(req.params.id, this.options)
      .then(async (transportBill) => {
        if (transportBill) {
          let updatedTransportBill = new TransportBill({
            ...transportBill.dataValues,
            consigneeName,
            rcNo,
            gstin,
            date,
            purpose,
            vehicleType,
            vehicleNo,
            from,
            to,
            purchaseOrderNo,
            exciseNo,
            remarks,
          });

          const t = await sequelize.transaction();
          // ! Finding deleted items
          let deletedGoods = transportBill.dataValues.goods.filter(
            (item: any) => !goods.find((i: any) => i.id === item.id)
          );
          const itemIdsToDelete = deletedGoods.map((item: any) => item.id);
          // ! Finding updated items
          let updatedGoods: any[] = [];
          goods.forEach((item: any) => {
            if (!item.id) delete item.id;
            updatedGoods.push({ ...item, billId: id });
          });

          try {
            // ! Updating transportBill
            await this.transportBillService.update(id, updatedTransportBill, {
              transaction: t,
            });
            // ! Deleting goods
            if (deletedGoods.length > 0)
              await TransportBillItem.destroy({
                where: { id: itemIdsToDelete },
                transaction: t,
              });
            // ! Updating goods
            if (updatedGoods)
              await TransportBillItem.bulkCreate(updatedGoods, {
                updateOnDuplicate: ["description", "quantity", "totalAmount"],
                transaction: t,
              });

            t.commit();
            res.status(200).json(updatedTransportBill);
          } catch (err) {
            await t.rollback();
            res.status(400).json(err);
          }
        } else
          res.status(404).json({
            message: `Transport Bill id:${req.params.id} does not exists`,
          });
      });
  }

  delete(req: Request, res: Response) {
    this.transportBillService.get(req.params.id).then((transportBill) => {
      if (transportBill) {
        this.transportBillService
          .delete(req.params.id)
          .then((transportBill) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `TransportBill id:${req.params.id} does not exists`,
        });
    });
  }
}
