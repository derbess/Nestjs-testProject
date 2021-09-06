import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Reservation } from "src/reservation/reservation.model";


interface RoomCreationAttrs {
    price: number;
}

@Table({tableName: 'rooms'})
export class Room extends Model<Room, RoomCreationAttrs> {
    
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    price: number;

    @HasMany(() => Reservation)
    reservations: Reservation[];

}