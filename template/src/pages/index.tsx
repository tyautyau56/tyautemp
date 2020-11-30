import styles from '../styles/index.module.scss';

export default function Index(){
    return(
        <div>
            <p>Hello World!</p>
            <p className={styles.scss_test}>Hello Next</p>
        </div>
    )
}