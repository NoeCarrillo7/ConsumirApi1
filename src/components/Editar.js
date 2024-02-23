import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_API, URL_IMAGES } from "../config/rutas";
import { useNavigate } from 'react-router-dom'; 


export function EditarUsuario(){
    const params=useParams();
    const [id, setId]=useState("");
    const [nombre, setNombre]=useState("");
    const [usuario, setUsuario]=useState("");
    const [password, setPassword]=useState("");
    const [foto, setFoto]=useState(null);
    const [rutaFoto, setRutaFoto]=useState("");
    //const [mensaje, setMensaje]=useState("");
    const [passwordViejo, setPasswordViejo]=useState("");
    const [saltViejo, setSaltViejo]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        async function buscarPorID(){
            var res=await axios.get(URL_API + "/buscarUsuarioPorId/"+params.id);
            console.log(res);
            setId(res.data.id);
            setNombre(res.data.nombre);
            setUsuario(res.data.usuario);
            setPasswordViejo(res.data.password);
            setSaltViejo(res.data.salt);
            setRutaFoto(URL_IMAGES + res.data.foto);
        }
        buscarPorID();
    },[params.id]);

   async function editarDatos(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append("id",id);
        formData.append("nombre", nombre);
        formData.append("usuario", usuario);
        formData.append("password", password);
        formData.append("passwordViejo",passwordViejo);
        formData.append("saltViejo",saltViejo);
        formData.append("foto", foto);

        try{
            const res= await axios.post(URL_API + "/editarUsuario",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            console.log(res);
            setNombre("");
            setUsuario("");
            setPassword("");
            setFoto(null);
            //setMensaje(res.data);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        catch(error){
            console.error("Error al guardar datos: ", error);
            /*setTimeout(()=>{
                setMensaje("");
            },3000);*/
        }
    }
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={editarDatos}>
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-black">
                                <h1 className="h3 mb-0">Editar Usuario</h1>
                            </div>
                            <div className="card-body bg-white">
                                <input className="form-control mb-3" type="text" placeholder="Id" name="id" id="id" value={id} readOnly />
                                <input type="hidden" name="passwordViejo" id="passwordViejo" value={passwordViejo} />
                                <input type="hidden" name="saltViejo" id="saltViejo" value={saltViejo} />
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input className="form-control" type="text" placeholder="Nombre" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label">Usuario</label>
                                    <input className="form-control" type="text" placeholder="Usuario" name="usuario" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Nuevo Password</label>
                                    <input className="form-control" type="password" placeholder="Password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Foto Actual</label>
                                    <div>
                                        <img src={rutaFoto} width="100" alt="Foto de usuario" className="img-thumbnail" />
                                    </div>
                                    <label htmlFor="foto" className="form-label mt-3">Cambiar Foto</label>
                                    <input className="form-control" type="file" name="foto" id="foto" onChange={(e) => setFoto(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="card-footer bg-white">
                                <button className="btn btn-primary w-100" type="submit">Guardar Cambios</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
}
//******************************************************************************************************************************************* */
export function EditarProducto(){
    const params=useParams();
    const [id, setId]=useState("");
    const [nombre, setNombre]=useState("");
    const [precio, setPrecio]=useState("");
    const [foto, setFoto]=useState(null);
    const [rutaFoto, setRutaFoto]=useState("");
    //const [mensaje, setMensaje]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        async function buscarPorID(){
            var res=await axios.get(URL_API + "/buscarProductoPorId/"+params.id);
            console.log(res);
            setId(res.data.id);
            setNombre(res.data.nombre);
            setPrecio(res.data.precio);
            setRutaFoto(URL_IMAGES + res.data.foto);
        }
        buscarPorID();
    },[params.id]);

   async function editarDatos(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append("id",id);
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("foto", foto);

        try{
            const res= await axios.post(URL_API + "/editarProductos",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            console.log(res);
            setNombre("");
            setPrecio("");
            setFoto(null);
            //setMensaje(res.data);
            setTimeout(() => {
                navigate("/productos");
            }, 1000);
        }
        catch(error){
            console.error("Error al guardar datos: ", error);
            /*setTimeout(()=>{
                setMensaje("");
            },3000);*/
        }
    }
    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={editarDatos}>
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-black">
                                <h1 className="h3 mb-0">Editar Producto</h1>
                            </div>
                            <div className="card-body bg-white">
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">ID</label>
                                    <input className="form-control" type="text" placeholder="ID" name="id" id="id" value={id} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input className="form-control" type="text" placeholder="Nombre del producto" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">Descripción</label>
                                    <input className="form-control" type="text" placeholder="Precio del producto" name="precio" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Foto Actual</label>
                                    <div>
                                        <img src={rutaFoto} width="100" alt="Foto de producto" className="img-thumbnail" />
                                    </div>
                                    <label htmlFor="foto" className="form-label mt-3">Cambiar Foto</label>
                                    <input className="form-control" type="file" name="foto" id="foto" onChange={(e) => setFoto(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="card-footer bg-white">
                                <button className="btn btn-primary w-100" type="submit">Guardar producto</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
}