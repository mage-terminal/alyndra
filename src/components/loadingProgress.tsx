export function LoadingProgress() {

  return (
      <div className="loading-container">
        <div id='loader'>
          <div id='title' className='flex'>
            <p className='loading-text'>LOADING</p>
            <div className='therefore'>∴</div>
            <p className="loading-number">%</p>
          </div>
          <div id='loading-bar-border'>
            <div className='loading-bar'>
            </div>
          </div>
          <div id='warning'>
            <p>
              <div className='exclamation'>!</div>
              &nbsp CAUTION, Do not turn off.
            </p>
            <div id='line-cascates'></div>
          </div>
        </div>
      </div>
  );
}
