import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  seatConfig: any = null;
  seatmap = [];

  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: '',
    eventId: 0
  };

  ngOnInit(): void {
    /*
        this.seatConfig = [

          {
            seat_map: [
              {
                seat_label: '1',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '2',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '3',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '4',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '5',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '6',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '7',
                layout: 'ggg__ggg'
              },
              {
                seat_label: '8',
                layout: 'ggg__gg'
              },
              {
                seat_label: '9',
                layout: 'ggg__gg'
              },
              {
                seat_label: '10',
                layout: 'ggg__gg'
              }
            ]
          }
        ];
       */
    /*
        this.processSeatChart(this.seatConfig);
        this.blockSeats('7_1,7_2');

     */
  }


  public processSeatChart(mapdata: any[]) {
    if (mapdata.length > 0) {
      let seatNoCounter = 1;
      // tslint:disable-next-line:prefer-for-of
      for (let counter = 0; counter < mapdata.length; counter++) {
        let rowlabel = '';
        const itemmap = mapdata[counter].seat_map;

        // Get the label name and price
        rowlabel = 'Row ' + itemmap[0].seat_label + ' - ';
        if (itemmap[itemmap.length - 1].seat_label !== ' ') {
          rowlabel += itemmap[itemmap.length - 1].seat_label;
        } else {
          rowlabel += itemmap[itemmap.length - 2].seat_label;
        }

        itemmap.forEach(mapelement => {
          const mapObj = {
            seatRowLabel: mapelement.seat_label,
            seats: [],
            seatPricingInformation: rowlabel
          };
          rowlabel = '';
          const seatValArr = mapelement.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; // Reset the seat label counter for new row
          }
          let totalItemCounter = 1;
          seatValArr.forEach(item => {
            const seatObj = {
              key: mapelement.seat_label + '_' + totalItemCounter,
              status: 'available',
              seatLabel: undefined,
              seatNo: undefined
            };

            if (item !== '_') {
              seatObj.seatLabel = mapelement.seat_label + ' ' + seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj.seatNo = '0' + seatNoCounter;
              } else {
                seatObj.seatNo = '' + seatNoCounter;
              }

              seatNoCounter++;
            }
            totalItemCounter++;
            mapObj.seats.push(seatObj);
          });
          console.log(' \n\n\n Seat Objects ', mapObj);
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    console.log('Seat to block: ', seatObject);
    if (seatObject.status === 'available') {
      seatObject.status = 'booked';
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status === 'booked')) {
      seatObject.status = 'available';
      const seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock !== '') {
      const seatsToBlockArr = seatsToBlock.split(',');
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        const seat = seatsToBlockArr[index] + '';
        const seatSplitArr = seat.split('_');
        console.log('Split seat: ', seatSplitArr);
        // tslint:disable-next-line:prefer-for-of
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel === seatSplitArr[0]) {
            // tslint:disable-next-line:radix
            const seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log('\n\n\nFount Seat to block: ', seatObj);
              seatObj.status = 'unavailable';
              this.seatmap[index2].seats[
                // tslint:disable-next-line:radix
              parseInt(seatSplitArr[1]) - 1
                ] = seatObj;
              console.log('\n\n\nSeat Obj', seatObj);
              console.log(
                // tslint:disable-next-line:radix
                this.seatmap[index2].seats[parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }
}
