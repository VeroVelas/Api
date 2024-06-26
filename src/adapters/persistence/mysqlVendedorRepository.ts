import { VendedorRepository } from '../../domain/interfaces';
import { Vendedor } from '../../domain/vendedor';
import { Connection } from 'mysql2/promise';

export class MysqlVendedorRepository implements VendedorRepository {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async save(vendedor: Vendedor): Promise<Vendedor> {
        const [result] = await this.connection.execute(
            'INSERT INTO vendedores (nombre, apellido, correo, telefono, password) VALUES (?, ?, ?, ?, ?)',
            [vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password]
        );
        const insertId = (result as any).insertId;
        return new Vendedor(insertId.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
    }

    async findById(id: string): Promise<Vendedor | null> {
        const [rows] = await this.connection.execute('SELECT * FROM vendedores WHERE id = ?', [id]);
        const vendedores = rows as any[];
        if (vendedores.length === 0) return null;
        const vendedor = vendedores[0];
        return new Vendedor(vendedor.id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password);
    }

    async findAll(): Promise<Vendedor[]> {
        const [rows] = await this.connection.execute('SELECT * FROM vendedores');
        const vendedores = rows as any[];
        return vendedores.map(vendedor => new Vendedor(vendedor.id.toString(), vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password));
    }

    async update(vendedor: Vendedor): Promise<Vendedor | null> {
        await this.connection.execute(
            'UPDATE vendedores SET nombre = ?, apellido = ?, correo = ?, telefono = ?, password = ? WHERE id = ?',
            [vendedor.nombre, vendedor.apellido, vendedor.correo, vendedor.telefono, vendedor.password, vendedor.id]
        );
        return vendedor;
    }

    async deleteById(id: string): Promise<void> {
        await this.connection.execute('DELETE FROM vendedores WHERE id = ?', [id]);
    }
}
