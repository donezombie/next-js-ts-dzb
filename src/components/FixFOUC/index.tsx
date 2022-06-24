import React, { ReactNode, useEffect, useState } from 'react';

const FixFOUC = ({ children }: { children: ReactNode }) => {
  //! State
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //! Render
  return (
    <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
      {children}
    </div>
  );
};

export default React.memo(FixFOUC);
