import './AboutProject.css'

const AboutProject = () => {
    return (
        <div className = 'aboutproject'>
            <article className = 'aboutproject-left'>
                <span className = 'aboutproject-title'>Mi Trello</span>
                <span className = 'aboutproject-description'>
                    Proyecto inspirado en Trello, que tiene el propósito de mejorar  habilidades en front-end y back-end.
                </span>
            </article>

            <article className = 'aboutproject-right'>
                <img src = '/img-mi_trello.svg' 
                     alt = 'img-mi_trello.svg' 
                     style = {{ height: '100%' }} />
            </article>
        </div>
    )
}

export default AboutProject
