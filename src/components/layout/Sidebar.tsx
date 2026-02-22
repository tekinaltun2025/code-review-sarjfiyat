import { memo } from 'react';
import AdSense from '../AdSense';

export const LeftSidebar = memo(() => (
  <div className="hidden xl:block w-28 2xl:w-32 flex-shrink-0">
    <div className="sticky top-4 space-y-4 p-2">
      <AdSense 
        slot="YOUR_LEFT_SIDEBAR_SLOT_1" 
        format="vertical"
        style={{ display: 'block', minHeight: '300px' }}
      />
      <AdSense 
        slot="YOUR_LEFT_SIDEBAR_SLOT_2" 
        format="vertical"
        style={{ display: 'block', minHeight: '300px' }}
      />
    </div>
  </div>
));

export const RightSidebar = memo(() => (
  <div className="hidden xl:block w-28 2xl:w-32 flex-shrink-0">
    <div className="sticky top-4 space-y-4 p-2">
      <AdSense 
        slot="YOUR_RIGHT_SIDEBAR_SLOT_1" 
        format="vertical"
        style={{ display: 'block', minHeight: '300px' }}
      />
      <AdSense 
        slot="YOUR_RIGHT_SIDEBAR_SLOT_2" 
        format="vertical"
        style={{ display: 'block', minHeight: '300px' }}
      />
    </div>
  </div>
));

LeftSidebar.displayName = 'LeftSidebar';
RightSidebar.displayName = 'RightSidebar';
