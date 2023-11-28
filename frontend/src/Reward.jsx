const Reward = () => {
    const imagePath = process.env.PUBLIC_URL + '/congratulations.jpg';

    return (  
        <div>
        <img src={imagePath}  style={{  width:'600px', height:'600px' }} />
      </div>
    );
}


export default Reward;