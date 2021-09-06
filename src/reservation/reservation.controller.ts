import { Body, Controller, Post } from '@nestjs/common';
import { AvailableDto } from './dto/available.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @Post()
    create(@Body() reservationDto: CreateReservationDto){
        return this.reservationService.createReservation(reservationDto);
    }

    @Post('/available')
    available(@Body() reservationDto: AvailableDto){
        return this.reservationService.getAllAvailable(reservationDto);
    }
}
