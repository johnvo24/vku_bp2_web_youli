import styles from './HeroSection.module.css'
import {Carousel} from 'react-responsive-carousel'

export default function HeroSection() {

    return (
        <div className={styles.container}>
            <Carousel showArrows={true}>
                <div>
                    <img src='/resources/images/success.jpg' alt='success' style={{width: '100%'}}/>
                    <p>abc</p>
                </div>
                <div>
                    <img src='/resources/images/money.jpg' alt='success' style={{width: '100%'}}/>
                    <p>abc</p>
                </div>
            </Carousel>
        </div>
    )

}