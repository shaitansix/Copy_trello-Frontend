import './AboutProject.css'

const AboutProject = () => {
    return (
        <div className = 'aboutproject'>
            <article className = 'aboutproject-left'>
                <span className = 'aboutproject-title'>My Trello</span>
                <span className = 'aboutproject-description'>
                    Proyecto inspirado en Trello, que tiene el propósito de mejorar  habilidades en front-end y back-end.
                </span>
            </article>

            <article className = 'aboutproject-right'>
                <img src = '/img-space.jpg' 
                     alt = 'hero.jpg' 
                     style = {{ width: '100%', height: '100%' }} />
            </article>
        </div>
    )
}

export default AboutProject