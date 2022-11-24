import React from "react"
import SlideToggle from "react-slide-toggle";

//components
import styles from './List.module.css'
import Container from '../../Container';

export default function List(props) {

    return (
        <>
            <div className={styles.list}>
                <Container customStyles={{
                    border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <SlideToggle
                        bestPerformance = {true}

                    >
                        {({ toggle, setCollapsibleElement }) => (
                            <div className="my-collapsible">
                                <button className="my-collapsible__toggle" onClick={toggle}>
                                    toggle
                                </button>
                                <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                    <div className="my-collapsible__content-inner">Collapsible content</div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>
                </Container>
            </div>
        </>
    )

}