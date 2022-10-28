
class Producto{
        
    constructor(codigo, nombre, cantidad, costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.anterior=null;
        this.siguiente=null;
    };

    info(){
        return `Código  ${this.codigo} --- Producto:${this.nombre} --- Cantidad: ${this.cantidad} --- Precio: $${this.costo}`
    }
};

class Inventario{
        
    constructor(){
            this.primero=null;
            this.ultimo=null;
        };

    agregarProducto(producto, codigo){
        let i = this.listaProductos.length
        if (i==0){
            this.listaProductos[i]=producto
            return true
        }
        let buscar = this.buscar(codigo)
        if(buscar == false ){
            while (this.listaProductos[i-1]!=null&&producto.codigo < this.listaProductos[i-1].codigo){
                this.listaProductos[i]= this.listaProductos[i-1];
                i--;
            }
            this.listaProductos[i]=producto;
            return true
        }else{
            return false;
        }
    }

    eliminar(codigo){
    
            for (let i = 0; i <= this.listaProductos.length-1; i++) {
                if (this.listaProductos[i].codigo == codigo){
                        for (let x = i; x <= this.listaProductos.length-1; x++) {
                            this.listaProductos[i] = this.listaProductos[i+1];
                        }
                }
            }
            this.listaProductos.pop();
            return true;  
    };

    buscar(codigo){
        let aux=this.primero
        while(aux!=null){
            if(aux.codigo==codigo){
                return aux
            }else{
                aux=aux.siguiente;
            }
        }
        return null;
    }
    
    listar(){
        let lista = '';
        let contador = 0;
        this.listaProductos.forEach(producto => {
            lista += this.listaProductos[contador].info()+"<br>";
            contador++
        });
        return `                LISTA
        <br>${lista}`;
    };
    

    listarInverso(){
        let lista = '';
        for(let i=this.listaProductos.length-1;i>=0;i--){
            lista += this.listaProductos[i].info()+"<br>";
        }
        return `                LISTA INVERSA
        <br>${lista}`;
    };
};

const miInv = new Inventario()

const btnAgregar = document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    const nombre = document.getElementById('txtNombre').value
    const cantidad = document.getElementById('txtCantidad').value
    const costo = document.getElementById('txtCosto').value
    if (codigo=="") {
        document.getElementById("listado").innerHTML=`NO se puede agregar el producto porque no tiene código`
    }else{
        const producto = new Producto(parseInt(codigo), nombre, cantidad, costo);
        res = miInv.agregarProducto(producto, codigo)
        if(res==true){
            document.getElementById("listado").innerHTML=`El producto fue agregado`
        }
        else if(res==false){
            document.getElementById("listado").innerHTML=`NO se agregó el producto porque el código ya está en uso`;
        }
    }
});

const btnEliminar = document.getElementById('btnEliminar')
btnEliminar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    if (miInv.buscar(codigo) == false) {
        document.getElementById("listado").innerHTML=`El producto con codigo: ${codigo} NO pudo ser eliminado porque no existe`
    } else{
        miInv.eliminar(codigo)
        document.getElementById("listado").innerHTML=`El prodcuto con codigo: ${codigo} fue eliminado`

    }

})

const btnBuscar = document.getElementById('btnBuscar')
btnBuscar.addEventListener('click', () => {
    const codigo = document.getElementById('txtCodigo').value
    let producto = miInv.buscar(codigo);
    if(miInv.buscar(codigo) == false){
        document.getElementById("listado").innerHTML=`<p>El producto con código ${codigo} NO fue encontrado</p>`
    } else {
        document.getElementById("listado").innerHTML=`<p>El producto con código ${codigo} fue encontrado</p><br>
        ${producto.info()}`
    }
})


const btnListar = document.getElementById('btnListar')
btnListar.addEventListener('click', () => {
    document.getElementById("listado").innerHTML=`<p>${miInv.listar()}</p>`
});

const btnListarInverso = document.getElementById('btnListarInverso')
btnListarInverso.addEventListener('click', () => {
    document.getElementById("listado").innerHTML=`<p>${miInv.listarInverso()}</p>`
});