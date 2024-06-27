import { AppointmentRepository } from '../domain/interfaces';
import { Appointment } from '../domain/appointment';

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}

    async createAppointment(appointment: Appointment): Promise<Appointment> {
        return this.appointmentRepository.save(appointment);
    }

    async getAppointment(id: string): Promise<Appointment | null> {
        return this.appointmentRepository.findById(id);
    }

    async updateAppointment(id: string, appointment: Appointment): Promise<Appointment | null> {
        return this.appointmentRepository.update(appointment);
    }

    async deleteAppointment(id: string): Promise<void> {
        return this.appointmentRepository.deleteById(id);
    }
}
