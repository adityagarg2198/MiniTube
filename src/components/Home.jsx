import React,{useState} from 'react';
import { Grid,Paper,makeStyles,Avatar } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import dotenv from 'dotenv';



const useStyles=makeStyles((theme)=>({
    avatartext:{
        color:'#FF0000',
        fontFamily:'Montserrat',
        marginLeft:'1%',
        marginTop:'1%',
    },
    avatar:{
        color:'white',
        backgroundColor:'#FF0000',
        marginLeft:'2%',
        marginTop:'1%',
        cursor:'pointer',
    },
    top:{
        maxHeight:'20vh',
    },
    heading:{
        textAlign:'center',
        color:'#FF0000',
        fontFamily:'Montserrat',
        fontSize:'2.7rem',
        margin:'1px auto',
        [theme.breakpoints.down('sm')]: {
            fontSize:'2.5rem',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'1.8rem',
          },
    },
    input:{
        color:'#FF0000',
        fontFamily:'Montserrat',
        fontSize:'2rem',
        display: 'block',
        margin : '2% auto',
        width:'75%',
    },
    btn:{
        backgroundColor:'#FF0000',
        color:'white',
        fontFamily:'Montserrat',
        fontSize:'1.2rem',
        display:'block',
        margin:'2% auto 2% auto',
    },
    frame:{
        display:'block',
        margin : '2% auto',
        width:'98%',
        minHeight:'90vh',
        [theme.breakpoints.down('sm')]: {
            minHeight:'60vh',
            width:'100%',
          },
        [theme.breakpoints.down('xs')]: {
            minHeight:'50vh',
            width:'100%',
          },  
    },
    videos:{
        padding:'5%',
        minHeight:'60vh',
    },
    img:{
        width:'100%',
        height:'50%',
        cursor:'pointer',
    },
    desc:{
        fontFamily:'Montserrat',
        fontSize:'1.3rem',
        margin:'1px auto',
        [theme.breakpoints.down('sm')]: {
            fontSize:'1.1rem',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'1rem',
          },

    },
}));

const Home = () => {
    const [input,setInput]=useState("");
    const [bool,setBool]=useState(false);
    const [vurl,setVurl]=useState("");
    const handleinput=(e)=>{
        const value=e.target.value;
        setInput(value);
    }
    const [videos,setVideos]=useState([]);

    const search=async()=>{
        try{
            const key=process.env.KEY;
            const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${input}&type=video&maxResults=50`;
                const res=await fetch(url,{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    },
                })
                const data= await res.json();
                if(!res.status===200){
                    const error=new Error(res.error);
                    throw error;
                }
                setVideos(data.items);

        }catch(err){
            console.log(err);
        }

    }
    const sendvideo=(videoId)=>{
        const url=`https://www.youtube.com/embed/${videoId}?autoplay=1`;
        setVurl(url);
        setBool(true);
        window.scrollTo(0,0);
    }
    const classes=useStyles();
    return (
        <>
            
            <Grid container className={classes.bg}>
                <Grid item xs={12} >
                        <a href="https://adityagarg2198.github.io/PortfolioWebsite/index.html" target="_blank"><Avatar className={classes.avatar}><CodeIcon></CodeIcon></Avatar></a>
                        <span className={classes.avatartext}>Made By</span> 
                    </Grid>
                <Grid item xs={12} className={classes.top}>
                    <p className={classes.heading}>MiniTube</p>
                </Grid>
                <Grid item xs={12}>
                    <label htmlFor="search"></label>
                    <input className={classes.input}placeholder="Search Youtube Videos"name="search" value={input} type="text" onChange={handleinput}/>
                    <button className={classes.btn}onClick={search}>Search</button>
                </Grid>
              {bool?<Grid item xs={12} className={classes.frame}>
                    <iframe className={classes.frame}src={vurl} frameborder="0" allowFullScreen/>
                </Grid>:null}
            </Grid>
            <Grid container spacing={2}className={classes.sugesstions}>
            {
                        videos.map(video=>{
                                return <Grid item xs={12} md={3}  >
                                        <Paper className={classes.videos}>
                                            <img className={classes.img}onClick={()=>sendvideo(video.id.videoId)} src={video.snippet.thumbnails.high.url}alt="" />
                                            <p className={classes.desc}>{video.snippet.title}</p>
                                        </Paper>
                                        
                                </Grid>
                            })
                }
            </Grid> 
        </>
    )
}

export default Home;
