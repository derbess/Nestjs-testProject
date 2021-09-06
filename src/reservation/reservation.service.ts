import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoomService } from 'src/room/room.service';
import sequelize from 'sequelize';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.model';
import { AvailableDto } from './dto/available.dto';

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation) private reservationRep: typeof Reservation, private roomRepository: RoomService){}

    async createReservation(dto: CreateReservationDto){
        const id = "_" + Math.random().toString(36).substr(2,9);
        dto["id"] = id;
        let in_date_dow_num = await this.reservationRep.sequelize.query(`Select extract(dow from date '${dto.in_date}');`);
        let out_date_dow_num = await this.reservationRep.sequelize.query(`Select extract(dow from date '${dto.out_date}');`);
        
        const in_date_dow = in_date_dow_num[0][0]['date_part'];
        const out_date_dow = out_date_dow_num[0][0]['date_part'];

        if(in_date_dow && (in_date_dow===1 || out_date_dow===4) && out_date_dow && (in_date_dow===1 || out_date_dow===4) )
        {
            throw new HttpException('въезд и выезд не могут попадать на понедельник и четверг', HttpStatus.BAD_REQUEST);
        }

        // const reservation = await this.reservationRep.create(dto);
        const available = await this.reservationRep.sequelize.query(
            ` 
            select * from rooms where id in (
            select Distinct(res.room_id) FROM reservation as res 
            where res.in_date >= '${dto.in_date}' AND res.in_date <= '${dto.out_date}' 
            OR res.out_date >= '${dto.in_date}' AND res.out_date <= '${dto.out_date}'
                ) and id = '${dto.room_id}'`
        )
        if(available[0].length){
            throw new HttpException('номер в это время занят', HttpStatus.BAD_REQUEST);
            console.log(available[0]);
            // return reservation;

        }
        let indate: Date = new Date(dto.in_date);
        let outdate: Date = new Date(dto.out_date);

        // console.log();
        
        let days = Math.abs(outdate.getTime()-indate.getTime());
        days = Math.ceil(days / (1000 * 60 * 60 * 24));
        let price = 0;
        if(days<10){
            price=1000*days;
        } else if(days>=10 && days<=20) {
            price= 1000 * days * 0.9; 
        } else {
            price= 1000 * days * 0.8; 
        }
        
        const total_price = Math.ceil(price);
        // console.log(outdate.getDay(), indate.getDay(), days, price);
  
        dto.total_price = total_price;
        const reservation = await this.reservationRep.create(dto);

        return reservation;
    }

    async getAllReservation() {
        const reservation = await this.reservationRep.findAll();
        return reservation;
    }

    async getAllAvailable(dto: AvailableDto) {

        const available = await this.reservationRep.sequelize.query(
            ` 
            select * from rooms where id not in (
            select Distinct(res.room_id) FROM reservation as res 
            where res.in_date >= '${dto.in_date}' AND res.in_date <= '${dto.out_date}' 
            OR res.out_date >= '${dto.in_date}' AND res.out_date <= '${dto.out_date}'
                )`
        )
        return available[0];
    }
    
}
