import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';


const useStyle = makeStyles({
    estiloTextField: {
        backgroundColor: "white",
        borderRadius:"5px",
    },
    estiloSendSVG:{
        color:"#5994ce"
    }
});

const CajaComentario = ({comentarios}) => {
    console.log(comentarios)
    const misEstilos = useStyle();
    return (
        <div className="contenedorCajaComentario" style={{ backgroundImage: "url(/assets/fondoComentarios.png)" }}>
            <div className="TodosLosComentarios">
                {comentarios.map((unComentario) => {
                    let nombreCompleto = unComentario.usuarioId.nombre + " " + unComentario.usuarioId.apellido;
                    return (
                        <div className = "portaAvatarComentario" key= {unComentario._id}>
                            <div className="avatar" style={{backgroundImage: `url(${unComentario.usuarioId.usuarioAvatar})`}}></div>
                            <div className="cajitaComentarioOtroUsuario" >
                                <h5>{nombreCompleto}</h5>
                                <div className = "comentario">
                                <span> {unComentario.comentario}</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    )
                })}
            </div>
            <div className="formularioComentario">
                <FormControl  variant="outlined" className = {misEstilos.estiloTextField} fullWidth={true} size="small">
                    <OutlinedInput
                        type='text'
                        //value={}
                        //onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    //onClick={}
                                    //onMouseDown={}
                                    edge="end"
                                >
                                <SendIcon className={misEstilos.estiloSendSVG}/> 
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        </div>
    )
}
export default CajaComentario;