import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: 'https://migmig.finance/',
  },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: routes.swap,
  },
  {
    name: 'Farm',
    icon: <FarmIcon />,
    href: routes.farms,
  },
  {
    name: 'Liquidity',
    icon: <PoolIcon />,
    href: routes.liquidity,
  },
];
