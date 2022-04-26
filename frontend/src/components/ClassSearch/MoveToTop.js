import '../../css/MoveToTop.css'

const MoveToTop = () => {

    const topFunction = (e) => {
        console.log(document.body.scrollTop);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <button onclick={topFunction} id="scrollTop" title="Go to top">Top</button>
    );
}

export default MoveToTop;