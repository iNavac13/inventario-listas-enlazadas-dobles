
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

        agregarPrimero(nuevo){
            this.primero.anterior=nuevo
            nuevo.siguiente=this.primero;
            this.primero=nuevo;
        }

        agregarUltimo(nuevo){
            this.ultimo.siguiente=nuevo;
            nuevo.anterior=this.ultimo;
            this.ultimo=nuevo;
        }

        agregarProducto(nuevo){
            if(this.buscar(nuevo.codigo)!=null){
                return false;
            }
            if(this.primero==null){
                this.primero = nuevo
                this.ultimo = nuevo
            }else{
                if(nuevo.codigo<this.primero.codigo){
                    this.agregarPrimero(nuevo);
                }else if(nuevo.codigo>this.ultimo.codigo){
                    this.agregarUltimo(nuevo);
                }else{
                    let aux = this.primero
                    while(aux.siguiente.codigo<nuevo.codigo){
                        aux = aux.siguiente;
                    }
                    nuevo.siguiente = aux.siguiente;
                    nuevo.anterior=aux
                    aux.siguiente.anterior=nuevo
                    aux.siguiente = nuevo
                }
            }
            return true;
        }

    eliminar(codigo){
    
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
        let aux = this.primero;
        let lista = ""
        while(aux){
            lista += `${aux.info()} <br>`;
            aux= aux.siguiente;
        }
        return lista
    }

    listarInverso(){
        let aux = this.ultimo;
        let lista = ""
        while(aux){
            lista += `${aux.info()} <br>`
            aux= aux.anterior;
        }
        return lista
    }
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
    if (miInv.buscar(codigo) == null) {
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
    if(miInv.buscar(codigo) == null){
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