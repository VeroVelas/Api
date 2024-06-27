import { AppointmentRepository } from '../../domain/interfaces';
import { Appointment } from '../../domain/appointment';
import { Connection } from 'mysql2/promise';

export class MysqlAppointmentRepository implements AppointmentRepository {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async save(appointment: Appointment): Promise<Appointment> {
        const [result] = await this.connection.execute(
            'INSERT INTO appointments (nombre, fecha, hora) VALUES (?, ?, ?)',
            [appointment.nombre, appointment.fecha, appointment.hora]
        );
        const insertId = (result as any).insertId;
        return new Appointment(insertId.toString(), appointment.nombre, appointment.fecha, appointment.hora);
    }

    async findById(id: string): Promise<Appointment | null> {
        const [rows] = await this.connection.execute('SELECT * FROM appointments WHERE id = ?', [id]);
        const appointments = rows as any[];
        if (appointments.length === 0) return null;
        const appointment = appointments[0];
        return new Appointment(appointment.id.toString(), appointment.nombre, appointment.fecha, appointment.hora);
    }

    async findAll(): Promise<Appointment[]> {
        const [rows] = await this.connection.execute('SELECT * FROM appointments');
        const appointments = rows as any[];
        return appointments.map(appointment => new Appointment(appointment.id.toString(), appointment.nombre, appointment.fecha, appointment.hora));
    }

    async update(appointment: Appointment): Promise<Appointment | null> {
        await this.connection.execute(
            'UPDATE appointments SET nombre = ?, fecha = ?, hora = ? WHERE id = ?',
            [appointment.nombre, appointment.fecha, appointment.hora, appointment.id]
        );
        return appointment;
    }

    async deleteById(id: string): Promise<void> {
        await this.connection.execute('DELETE FROM appointments WHERE id = ?', [id]);
    }
}
