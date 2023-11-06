import './button.css'

const Button = ({hasIcon, btnText, action, isActive, Icon }) => {

  const makeBtnStyle = (isIcon, btnActive) => {
      if(isIcon){
          return "btn-has-icon"
      }
      else{
          if(btnActive){
              return "btn active-btn"
          }
          else{
              return "btn inActive-btn"
          }
      }
  }
  
return (
  <div 
      className={makeBtnStyle(hasIcon, isActive)}
      onClick={action}
  >
      { hasIcon &&
          <div className="btn-icon">
              <Icon />
          </div>
      }

      <div className="btn-text">
          {btnText}
      </div>
  </div>
)
}

export default Button;