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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
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
    const [modal, setModal] = useState({
        estaAbierto: false,
        body: "",
        titulo: "",
        idComentario: "",
        funcionAEjecutar: null,
        accion: ""
    });

    //Para abrir o cerrar el Modal
    const cerrarModal = () => {
        setModal({
            estaAbierto: false,
            body: "",
            titulo: "",
            idComentario: "",
            funcionAEjecutar: null,
            accion: ""
        });

    }


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
    const [comentarioSiendoBorrado, setComentarioSiendoBorrado] = useState("")
    const solicitarModificarComentario = async (accion, idComentario = null) => {
        if (!usuarioLogueado)
            return mostrarTostada("info", "You must be logged in to comment it");
        let comentario;
        let setCargandoPeticion;
        switch (accion) {
            case "agregar":
                comentario = comentarioAPostear.comentario;
                setCargandoPeticion = setProcesandoPeticionPostear;
                break;
            case "editar":
                comentario = comentarioAEditar.nuevoComentario;

                setCargandoPeticion = setProcesandoPeticionEditar;
                cerrarModal();
                break;
            case "borrar":
                setCargandoPeticion = setProcesandoPeticionBorrar;
                setComentarioSiendoBorrado(idComentario);
                cerrarModal();
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
        if (accion === "editar") { setComentarioAEditar({ idComentario: "", nuevoComentario: "", }) }
        if (accion === "agregar") { setComentarioAPostear({ comentario: "" }) }
    }

    const colocarTexfieldDeEditacion = (e) => {
        const idComentario = e.currentTarget.dataset.idcomentario;
        setComentarioAEditar({
            ...comentarioAEditar,
            idComentario: idComentario,
            nuevoComentario: comentarios.find(comentario => comentario._id === idComentario).comentario
        })
    }

    const mostrarModal = (accion, e) => {
        const idComentario = e.currentTarget.dataset.idcomentario;
        const funcionAEjecutar = solicitarModificarComentario
        let titulo, body;
        switch (accion) {
            case "editar":
                titulo = "?? Are you sure to save the changes ?"
                body = comentarioAEditar.nuevoComentario;
                break;
            case "borrar":
                let comentario = comentarios.find(unComentario => unComentario._id === idComentario).comentario;
                titulo = " Are you sure you want to delete the comment ? ";
                body = comentario;
                break;
            default:
                return null;
        }

        setModal({
            ...modal,
            estaAbierto: true,
            body,
            idComentario,
            titulo,
            funcionAEjecutar,
            accion
        })
    }
    const agregarParrafos = (texto) => {
        return (
            <span >{
                texto.split("\n").map((unRenglon, indice) => {
                    return (
                        <p key={unRenglon + indice}>{unRenglon}</p>
                    )
                })
            }</span>
        )
    }

    return (
        <div className="contenedorCajaComentario" style={{ backgroundImage: "url(/assets/fondoComentarios.png)" }}>
            <div className="TodosLosComentarios">
                {comentarios.map((unComentario) => {
                    let nombreCompleto = unComentario.usuarioId.nombre + " " + unComentario.usuarioId.apellido;
                    return (
                        <div className={usuarioLogueado && unComentario.esModificable ? "portaAvatarComentarioLogueado" : "portaAvatarComentario"} key={unComentario._id}>
                            <div className={usuarioLogueado && unComentario.esModificable ? "avatarLogueado" : "avatar"} style={{ backgroundImage: `url(${unComentario.usuarioId.usuarioAvatar})` }}></div>
                            <div className={!usuarioLogueado || !unComentario.esModificable ? "portaNombreUsuarioYComentario" : comentarioAEditar.idComentario === "" ? "portaNombreUsuarioYComentarioLogueado" : "portaNombreUsuarioYComentarioEditando"} >
                                <div className="portaNombreUsuarioYOpcionesComentario">
                                    <div className="espacioNombreUsuarioComentario"><h5>{nombreCompleto}</h5></div>
                                    {(usuarioLogueado && unComentario.esModificable) &&
                                        <div className="opcionesComentarios">
                                            {comentarioAEditar.idComentario === unComentario._id
                                                ?
                                                <Tooltip title="Cancel" placement="top" arrow>
                                                    <IconButton
                                                        onClick={() => limpiarInput("editar")}
                                                        edge="end"
                                                        size="small"
                                                        data-idcomentario={unComentario._id}
                                                        className={misEstilos.estiloSVGCancelar}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip>


                                                : procesandoPeticionBorrar ||
                                                <>
                                                    <Tooltip title="Edit" placement="top" arrow>
                                                        <IconButton
                                                            onClick={(e) => colocarTexfieldDeEditacion(e)}
                                                            edge="end"
                                                            size="small"
                                                            data-idcomentario={unComentario._id}
                                                            className={misEstilos.estiloSVGEditar}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete" placement="top" arrow>
                                                        <IconButton
                                                            edge="end"
                                                            size="small"

                                                            onClick={(e) => mostrarModal("borrar", e)}
                                                            data-idcomentario={unComentario._id}
                                                            className={misEstilos.estiloSVGBorrar}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            }
                                            {comentarioSiendoBorrado === unComentario._id && <CircularProgress size={25} style={{ color: "red" }} />}
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
                                                        ? <InputAdornment position="end">
                                                            <CircularProgress size={25} style={{ margin: "12px" }} />
                                                        </InputAdornment>
                                                        :
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                data-idcomentario={unComentario._id}
                                                                onClick={(e) => mostrarModal("editar", e)}
                                                                disabled={comentarioAEditar.nuevoComentario.split("\n").join("") === ""}
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
                                            {agregarParrafos(unComentario.comentario)}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="formularioComentario">
                <FormControl variant="outlined" className={misEstilos.estiloTextField} fullWidth={true} size="small" >
                    <OutlinedInput
                        rowsMax={4}
                        placeholder={usuarioLogueado ? "Leave your comment here" : "You must be logued to comment it"}
                        multiline={true}
                        type='text'
                        value={usuarioLogueado ? comentarioAPostear.comentario : ""}
                        onChange={(e) => leerInputPostear(e)}
                        endAdornment={
                            procesandoPeticionPostear

                                ? <InputAdornment position="end">
                                    <CircularProgress size={25} style={{ margin: "12px" }} />
                                </InputAdornment>
                                :
                                <Tooltip title="Send" placement="top" arrow>
                                    <InputAdornment position="end">
                                        <IconButton
                                            disabled={comentarioAPostear.comentario.split("\n").join("") === ""}
                                            onClick={() => solicitarModificarComentario("agregar")}
                                            edge="end"
                                        >
                                            <SendIcon className={misEstilos.estiloSendSVG} />
                                        </IconButton>
                                    </InputAdornment>
                                </Tooltip>
                        }
                    />
                </FormControl>
            </div>
            <div >

                {/*<Button color="danger" onClick={toggle}></Button>*/}


                <Modal isOpen={modal.estaAbierto} toggle={cerrarModal} style={{ marginTop: "33vh", wordWrap: "break-word" }}>
                    <ModalHeader toggle={cerrarModal}>{modal.titulo}</ModalHeader>
                    <ModalBody>
                        {agregarParrafos(modal.body)}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" data-idcomentario={modal.idComentario} onClick={() => modal.funcionAEjecutar(modal.accion, modal.idComentario)}> Yes !</Button>{' '}
                        <Button color="danger" onClick={cerrarModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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