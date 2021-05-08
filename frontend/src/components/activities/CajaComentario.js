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
const useStyle = makeStyles(theme => ({
    '@global': {
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


    estiloTextField: {
        backgroundColor: "white",
        borderRadius: "5px",
        marginTop: "1em"
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



const CajaComentario = ({ idItinerario, comentarios, usuarioLogueado, agregarComentario, borrarComentario }) => {
    //console.log(comentarios)
    const misEstilos = useStyle();
    const [comentarioAPostear, setComentarioAPostear] = useState("");
    const [comentarioAEditar, setComentarioAEditar] = useState({
        idComentario: "",
        nuevoComentario: "",
    })




    const leerInputPostear = (e) => {
        setComentarioAPostear(e.target.value)
    }
    const leerInputEditar = (e) => {
        setComentarioAEditar({
            ...comentarioAEditar,
            nuevoComentario: e.target.value
        })
    }
    const cancelarEditacion = () => {
        setComentarioAEditar({
            idComentario: "",
            nuevoComentario: ""
        })
    }


    const postearComentario = () => {
        if (!usuarioLogueado)
            return mostrarTostada("info", "You must be logged in to comment it");
        agregarComentario(idItinerario, usuarioLogueado.token, comentarioAPostear)
        setComentarioAPostear("");
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

    //pre: usuario esta logueado
    const solicitarBorrarComentario = (e) => {
        const idComentario = e.currentTarget.dataset.idcomentario
        console.log("el comentaio seleccionado es: ", comentarios.find(comentario => comentario._id === idComentario))
        borrarComentario(idItinerario, usuarioLogueado.token, e.currentTarget.dataset.idcomentario)
    }
    return (
        <div className="contenedorCajaComentario" style={{ backgroundImage: "url(/assets/fondoComentarios.png)" }}>
            <div className="TodosLosComentarios">
                {comentarios.map((unComentario) => {
                    let nombreCompleto = unComentario.usuarioId.nombre + " " + unComentario.usuarioId.apellido;
                    return (
                        <div className="portaAvatarComentario" key={unComentario._id}>
                            <div className="avatar" style={{ backgroundImage: `url(${unComentario.usuarioId.usuarioAvatar})` }}></div>
                            <div className={comentarioAEditar.idComentario === "" ? "portaNombreUsuarioYComentario" : "portaNombreUsuarioYComentarioEditando"} >
                                <div className="portaNombreUsuarioYOpcionesComentario">
                                    <div className="espacioNombreUsuarioComentario"><h5>{nombreCompleto}</h5></div>
                                    <div className="opcionesComentarios">
                                        {comentarioAEditar.idComentario === unComentario._id
                                            ?
                                            <IconButton
                                                onClick={cancelarEditacion}
                                                edge="end"
                                                size="small"
                                                data-idcomentario={unComentario._id}
                                                className={misEstilos.estiloSVGCancelar}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                            :
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
                                                    onClick={(e) => solicitarBorrarComentario(e)}
                                                    data-idcomentario={unComentario._id}
                                                    className={misEstilos.estiloSVGBorrar}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    </div>
                                </div>
                                {comentarioAEditar.idComentario === unComentario._id
                                    ? (
                                        <FormControl variant="outlined" className={misEstilos.estiloTextField} fullWidth={true} size="small">
                                            <OutlinedInput
                                                rowsMax={4}
                                                multiline={true}
                                                type='text'
                                                value={comentarioAEditar.nuevoComentario}
                                                onChange={(e) => leerInputEditar(e)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={postearComentario}
                                                            edge="end"
                                                        >
                                                            <SendIcon className={misEstilos.estiloSendSVG} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    )
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
                        multiline={true}
                        type='text'
                        value={comentarioAPostear}
                        onChange={(e) => leerInputPostear(e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={postearComentario}
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
    agregarComentario: cityItineraryActions.agregarComentario,
    borrarComentario: cityItineraryActions.borrarComentario
}


export default connect(mapStateToProps, mapDispatchToProps)(CajaComentario);

/*

*/