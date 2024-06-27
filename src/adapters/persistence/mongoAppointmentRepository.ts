import { AppointmentRepository } from '../../domain/interfaces';
import { Appointment } from '../../domain/appointment';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface AppointmentDocument extends Document {
    nombre: string;
    fecha: string;
    hora: string;
    _id: mongoose.Types.ObjectId;
}

const appointmentSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
});

const AppointmentModel: Model<AppointmentDocument> = mongoose.model<AppointmentDocument>('Appointment', appointmentSchema);

export class MongoAppointmentRepository implements AppointmentRepository {
    private appointmentModel: Model<AppointmentDocument>;

    constructor() {
        this.appointmentModel = AppointmentModel;
    }

    async save(appointment: Appointment): Promise<Appointment> {
        const appointmentModel = new this.appointmentModel(appointment);
        const savedAppointment = await appointmentModel.save();
        return new Appointment(savedAppointment._id.toString(), savedAppointment.nombre, savedAppointment.fecha, savedAppointment.hora);
    }

    async findById(id: string): Promise<Appointment | null> {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) return null;
        return new Appointment(appointment._id.toString(), appointment.nombre, appointment.fecha, appointment.hora);
    }

    async findAll(): Promise<Appointment[]> {
        const appointments = await this.appointmentModel.find();
        return appointments.map(appointment => new Appointment(appointment._id.toString(), appointment.nombre, appointment.fecha, appointment.hora));
    }

    async update(appointment: Appointment): Promise<Appointment | null> {
        const updatedAppointment = await this.appointmentModel.findByIdAndUpdate(appointment.id, appointment, { new: true });
        if (!updatedAppointment) return null;
        return new Appointment(updatedAppointment._id.toString(), updatedAppointment.nombre, updatedAppointment.fecha, updatedAppointment.hora);
    }

    async deleteById(id: string): Promise<void> {
        await this.appointmentModel.findByIdAndDelete(id);
    }
}
