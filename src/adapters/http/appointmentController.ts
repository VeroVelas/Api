import { Request, Response } from 'express';
import { AppointmentService } from '../../application/appointmentService';
import { Appointment } from '../../domain/appointment';

export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    public async createAppointment(req: Request, res: Response): Promise<Response> {
        const appointment: Appointment = req.body;
        const createdAppointment = await this.appointmentService.createAppointment(appointment);
        return res.status(201).json(createdAppointment);
    }

    public async getAppointment(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const appointment = await this.appointmentService.getAppointment(id);
        return res.status(200).json(appointment);
    }

    public async updateAppointment(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const appointment: Appointment = req.body;
        const updatedAppointment = await this.appointmentService.updateAppointment(id, appointment);
        return res.status(200).json(updatedAppointment);
    }

    public async deleteAppointment(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        await this.appointmentService.deleteAppointment(id);
        return res.status(204).send();
    }
}
