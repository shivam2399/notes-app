import ReactDOM from 'react-dom';

const Portal = ({children}) => {

    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
      }
      
      const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }
    

    return ReactDOM.createPortal(
        <>
          <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                {children}
          </div>
        </>,
        document.getElementById('modal')
    )
}

export default Portal;