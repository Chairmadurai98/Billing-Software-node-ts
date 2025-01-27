import { Schema, model, models, Document } from 'mongoose';

export type ICounter = {
    _id: string;  // This will be a string, like "orderId"
    seq: number;  // This will be the current serial number
}

const counterSchema = new Schema<ICounter>({
    _id: { type: String, required: true },  // The key could be invoiceId
    seq: { type: Number, default: 0 },      // Start the sequence at 0
});

const counterModel = models.Counter || model<ICounter>('Counter', counterSchema);

export default counterModel;
