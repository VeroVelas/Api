import { VendedorRepository } from '../../domain/interfaces';
import { Vendedor } from '../../domain/vendedor';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface VendedorDocument extends Document {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    password: string;
    _id: mongoose.Types.ObjectId;
}

const vendedorSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },
});

const VendedorModel: Model<VendedorDocument> = mongoose.model<VendedorDocument>('Vendedor', vendedorSchema);

export class MongoVendedorRepository implements VendedorRepository {
    private vendedorModel: Model<VendedorDocument>;

    constructor() {
        this.vendedorModel = VendedorModel;
    }

    async save(vendedor: Vendedor): Promise<Vendedor> {
        const vendedorModel = new this.vendedorModel(vendedor);
        const savedVendedor = await vendedorModel.save();
        return new Vendedor(savedVendedor._id.toString(), savedVendedor.nombre, savedVendedor.apellido, savedVendedor.correo, savedVendedor.telefono, savedVendedor.password);
    }

    async findById(id: string): Promise<Vendedor | null> {
        const vendedor = await this.vendedorModel.findById(id);
        if (!vendedor) return null;
        return new Vendedor(vendedor._id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
    }

    async findAll(): Promise<Vendedor[]> {
        const vendedores = await this.vendedorModel.find();
        return vendedores.map(vendedor => new Vendedor(vendedor._id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password));
    }

    async update(vendedor: Vendedor): Promise<Vendedor | null> {
        const updatedVendedor = await this.vendedorModel.findByIdAndUpdate(vendedor.id, vendedor, { new: true });
        if (!updatedVendedor) return null;
        return new Vendedor(updatedVendedor._id.toString(), updatedVendedor.nombre, updatedVendedor.apellido, updatedVendedor.correo, updatedVendedor.telefono, updatedVendedor.password);
    }

    async deleteById(id: string): Promise<void> {
        await this.vendedorModel.findByIdAndDelete(id);
    }
}
