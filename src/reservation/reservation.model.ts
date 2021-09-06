import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/room/room.model";


interface CreateReservationAttrs {
    in_date: Date,
    out_date: Date,
    room_id: string
}

@Table({tableName: 'reservation'})
export class Reservation extends Model<Reservation, CreateReservationAttrs>{

    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string

    @Column({type: DataType.DATE})
    in_date: Date

    @Column({type: DataType.DATE})
    out_date: Date
    
    @Column({type: DataType.INTEGER})
    total_price: number

    @ForeignKey(()=> Room)
    @Column({type: DataType.STRING})
    room_id: string

    @BelongsTo(()=>Room)
    room: Room
}