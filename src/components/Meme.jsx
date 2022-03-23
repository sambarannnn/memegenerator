import React from "react"

export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])


    function changeHandler(event) {
        const {name, value} = event.target
        setMeme(prevMemeData => ({
            ...prevMemeData,
            [name] : value
        }))
    }
    function getMemeImage() {
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            topText: "",
            bottomText: "",
            randomImage: url
        }))
        
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    name="topText"
                    type="text"
                    value={meme.topText}
                    onChange={changeHandler}
                    placeholder="Top text"
                    className="form--input"
                />
                <input 
                    name="bottomText"
                    type="text"
                    value={meme.bottomText}
                    onChange={changeHandler}
                    placeholder="Bottom text"
                    className="form--input"
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}