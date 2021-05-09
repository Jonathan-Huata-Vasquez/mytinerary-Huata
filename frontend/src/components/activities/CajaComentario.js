import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
//import Input from '@material-ui/core/Input';
import { connect } from 'react-redux'
import cityItineraryActions from '../../redux/actions/cityItineraryAction'
import { mostrarTostada, } from '../../helpers/tostadas'
import { CircularProgress } from '@material-ui/core';
const useStyle = makeStyles(theme => ({

    '*::-webkit-scrollbar': {
        width: '10px'
    },
    '*::-webkit-scrollbar-track': {
        backgroundColor: "rgba(54, 99, 110, 0.662)",
        borderradius: "25px",
    },
    '*::-webkit-scrollbar-thumb': {
        backgroundColor: "#53afe4",
        borderRadius: "25px",
    }
    ,

    estiloTextField: {
        backgroundColor: "white",
        borderRadius: "5px",
        marginTop: "1em",
        "&::placeholder": {
            color: "black",
            backgroundColor: "#53afe4",
        },
        '*::-webkit-scrollbar': {
            width: '10px'
        },
        '*::-webkit-scrollbar-track': {
            backgroundColor: "rgba(54, 99, 110, 0.662)",
            borderradius: "25px",
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: "#53afe4",
            borderRadius: "25px",
        }
    },
    estiloInputEditando: {
        color: "white",
        flexGrow: 1,
        marginTop: "10px",

    },
    estiloSendSVG: {
        color: "#5994ce",
    },
    estiloSVGCancelar: {
        color: "red",
        '&:hover': {
            background: "white",
        },
    },
    estiloSVGEditar: {
        color: "white",
        marginRight: "5px",
        '&:hover': {
            background: "grey",
        },
    },
    estiloSVGBorrar: {
        color: "red",
        '&:hover': {
            background: "#f38f8f",
        },
    }
}));



const CajaComentario = ({ idItinerario, comentarios, usuarioLogueado, modificarComentario }) => {

    const misEstilos = useStyle();
    const [comentarioAPostear, setComentarioAPostear] = useState({
        comentario: "",
    });

    const [comentarioAEditar, setComentarioAEditar] = useState({
        idComentario: "",
        nuevoComentario: "",
    })

    const leerInputPostear = (e) => {
        setComentarioAPostear({
            ...comentarioAPostear,
            comentario: e.target.value
        })
    }
    const leerInputEditar = (e) => {
        setComentarioAEditar({
            ...comentarioAEditar,
            nuevoComentario: e.target.value
        })
    }


    const [procesandoPeticionPostear, setProcesandoPeticionPostear] = useState(false)
    const [procesandoPeticionEditar, setProcesandoPeticionEditar] = useState(false)
    const [procesandoPeticionBorrar, setProcesandoPeticionBorrar] = useState(false)
    const [comentarioSiendoBorrado,setComentarioSiendoBorrado] = useState("")
    const solicitarModificarComentario = async (accion, e = null) => {
        if (!usuarioLogueado)
            return mostrarTostada("info", "You must be logged in to comment it");
        let comentario, idComentario;
        let setCargandoPeticion;
        switch (accion) {
            case "agregar":
                comentario = comentarioAPostear.comentario;
                setCargandoPeticion = setProcesandoPeticionPostear;
                break;
            case "editar":
                comentario = comentarioAEditar.nuevoComentario;
                idComentario = comentarioAEditar.idComentario;
                setCargandoPeticion = setProcesandoPeticionEditar;
                break;
            case "borrar":
                idComentario = e.currentTarget.dataset.idcomentario;
                setCargandoPeticion = setProcesandoPeticionBorrar;
                setComentarioSiendoBorrado(idComentario);

                break;
            default:
                console.log("accion desconocida: " + accion)
        }
        setCargandoPeticion(true);
        let pedidoExitoso = await modificarComentario(idItinerario, usuarioLogueado.token, { idComentario, comentario, accion })

        if (pedidoExitoso) {
            limpiarInput(accion);
        }
        setComentarioSiendoBorrado("");
        setCargandoPeticion(false)
    }

    const limpiarInput = (accion) => {
        if (accion === "editar") {
            setComentarioAEditar({
                idComentario: "",
                nuevoComentario: "",
            })
        }
        if (accion === "agregar") {
            setComentarioAPostear({
                comentario: "",
            })
        }
    }

    const colocarTexfieldDeEditacion = (e) => {
        const idComentario = e.currentTarget.dataset.idcomentario;
        console.log(idComentario)
        setComentarioAEditar({
            ...comentarioAEditar,
            idComentario: idComentario,
            nuevoComentario: comentarios.find(comentario => comentario._id === idComentario).comentario
        })
    }
    
    return (
        <div className="contenedorCajaComentario" style={{ backgroundImage: "url(/assets/fondoComentarios.png)" }}>
            <div className="TodosLosComentarios">
                {comentarios.map((unComentario) => {
                    let nombreCompleto = unComentario.usuarioId.nombre + " " + unComentario.usuarioId.apellido;
                    return (
                        <div className={usuarioLogueado && unComentario.esModificable? "portaAvatarComentarioLogueado":"portaAvatarComentario"} key={unComentario._id}>
                            <div className={usuarioLogueado && unComentario.esModificable ? "avatarLogueado":"avatar"} style={{ backgroundImage: `url(${unComentario.usuarioId.usuarioAvatar})` }}></div>
                            <div className={ !usuarioLogueado || !unComentario.esModificable ?  "portaNombreUsuarioYComentario" : comentarioAEditar.idComentario === "" ?"portaNombreUsuarioYComentarioLogueado" : "portaNombreUsuarioYComentarioEditando" } >
                                <div className="portaNombreUsuarioYOpcionesComentario">
                                    <div className="espacioNombreUsuarioComentario"><h5>{nombreCompleto}</h5></div>
                                    {(usuarioLogueado && unComentario.esModificable) &&
                                        <div className="opcionesComentarios">
                                            {comentarioAEditar.idComentario === unComentario._id
                                                ?
                                                <IconButton
                                                    onClick={() => limpiarInput("editar")}
                                                    edge="end"
                                                    size="small"
                                                    data-idcomentario={unComentario._id}
                                                    className={misEstilos.estiloSVGCancelar}
                                                >
                                                    <CancelIcon />
                                                </IconButton>

                                                : procesandoPeticionBorrar || 
                                                    <>
                                                        <IconButton
                                                            onClick={(e) => colocarTexfieldDeEditacion(e)}
                                                            edge="end"
                                                            size="small"
                                                            data-idcomentario={unComentario._id}
                                                            className={misEstilos.estiloSVGEditar}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            edge="end"
                                                            size="small"
                                                            onClick={(e) => solicitarModificarComentario("borrar", e)}
                                                            data-idcomentario={unComentario._id}
                                                            className={misEstilos.estiloSVGBorrar}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                        } 
                                        {comentarioSiendoBorrado === unComentario._id && <CircularProgress size={25} style={{color:"red"}}/>}     
                                        </div>
                                    }
                                </div>
                                {comentarioAEditar.idComentario === unComentario._id
                                    ? (
                                        <FormControl variant="outlined" className={misEstilos.estiloTextField} fullWidth={true} size="small">
                                            <OutlinedInput
                                                disabled={procesandoPeticionPostear}
                                                autoFocus={true}
                                                rowsMax={4}
                                                multiline={true}
                                                type='text'
                                                value={comentarioAEditar.nuevoComentario}
                                                onChange={(e) => leerInputEditar(e)}
                                                endAdornment={
                                                    procesandoPeticionEditar
                                                        ? <CircularProgress size={25} />
                                                        :
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => solicitarModificarComentario("editar")}
                                                                edge="end"
                                                            >
                                                                <SendIcon className={misEstilos.estiloSendSVG} />
                                                            </IconButton>
                                                        </InputAdornment>
                                                }
                                            />
                                        </FormControl>)
                                    : (
                                        <div className="comentario">
                                            <span> {unComentario.comentario}</span>
                                        </div>)
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="formularioComentario">
                <FormControl variant="outlined" className={misEstilos.estiloTextField} fullWidth={true} size="small">
                    <OutlinedInput
                        rowsMax={4}
                        placeholder={usuarioLogueado? "Leave your comment here" : "You must be logued to comment it"}
                        //disabled={!usuarioLogueado}
                        multiline={true}
                        type='text'
                        value={usuarioLogueado? comentarioAPostear.comentario : ""}
                        onChange={(e) => leerInputPostear(e)}
                        endAdornment={
                            procesandoPeticionPostear
                                ? <CircularProgress size={25} />
                                :
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => solicitarModificarComentario("agregar")}
                                        edge="end"
                                    >
                                        <SendIcon className={misEstilos.estiloSendSVG} />
                                    </IconButton>
                                </InputAdornment>
                        }
                    />
                </FormControl>
            </div>

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        usuarioLogueado: state.authReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    modificarComentario: cityItineraryActions.modificarComentario,
    borrarComentario: cityItineraryActions.borrarComentario
}


export default connect(mapStateToProps, mapDispatchToProps)(CajaComentario);

/*
<div className={ comentarioAEditar.idComentario === "" ? "portaNombreUsuarioYComentario" : "portaNombreUsuarioYComentarioEditando"} >
*/