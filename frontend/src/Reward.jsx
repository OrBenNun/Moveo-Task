const Reward = () => {
    const imagePath = process.env.PUBLIC_URL + '/congratulations.jpg';

    return (  
        <div>
        <img src={imagePath}  style={{  width:'350px', height:'350px' }} />
      </div>
    );
}


export default Reward;