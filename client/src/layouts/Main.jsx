import mainPhoto from '../assets/hero.png'

const Main = () => {
    return(
        <div className='main'>
            <h1>쇼핑몰</h1>
            <section>
                <p>최신 컴퓨터 기기</p>
                <div className="main-img">
                    <img src={mainPhoto} alt="main photo" />
                </div>
            </section>
        </div>
    )
}

export default Main