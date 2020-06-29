export class DestinoViaje {
  public static listOfServices = [
    { name: 'housekeeping', icon:'cleaning_services' },
    { name: 'bed'    , icon:'single_bed'     },
    { name: 'wifi'   , icon:'wifi'    },
  ];
  private static uuid:number = 0;

  constructor(
    public nombre:string = "Destino", 
    public url:string = "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", 
    public descripcion:string = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptatum! Dolor quo, perspiciatis voluptas totam", 
    public servicios:{name:string,icon:string}[] = DestinoViaje.listOfServices, 
    public votos:number = 0,
    public id?:string
  ) {
    if(id === undefined) {
      this.id = DestinoViaje.uuid.toString();
      DestinoViaje.uuid++;
    }
  }
  increaseVotos() { this.votos++; return this; };
  decreaseVotos() { if(this.votos>0) this.votos--; return this; };

  copy() {
    return new DestinoViaje(this.nombre, this.url, this.descripcion, this.servicios, this.votos, this.id);
  }
}