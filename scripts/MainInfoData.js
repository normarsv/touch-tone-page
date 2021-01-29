import {
  createFromIconfontCN,
  CustomerServiceFilled,
  ForwardFilled,
  OrderedListOutlined,
  PhoneFilled,
  PlusCircleFilled,
  UnorderedListOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2181971_jx7g7qqv36.js', // icon-th, icon-users, icon-list-alt, icon-th-list, icon-FontAwesomeheadphones, icon-map, icon-mic, icon-tty
  ],
});
//The IP of the page
export const mainIp = 'https://touch-tone.guaodev.com'; //process.env.API_MAIN_IP; //REGRESENLO A .env NO LO DEJEN DIRECTO
export let imageMainIp = process.env.NODE_ENV === 'development' ? mainIp : '';

//Name of session save
export const nameSession = 'Touch-Tone';

//Name of the organization where we are going to get the info of the page
export const adminOrg = 'ORG Cliente';

//The project is Multiple Language
export const isMultipleLanguage = false;

//Available Languages
export const availableLanguages = [
  {
    key: 'es',
    value: 'es',
    data: '',
    text: 'Español',
    isBase: true,
  },
];

//The base language of the page/system (check the project for that)
export const baseLanguage = () => {
  const foundLanguage = availableLanguages.find((lang) => {
    return lang.isBase === true;
  });
  return foundLanguage;
};

//Dir of the logo
export const logo = '/logo-baz.png';
export const logoBurger = '/logo_burger.png';
export const logoSticky = '/logo_sticky.png';
export const logoSmall = '/logo_small.png';
export const logoSmallBurger = '/logo_small_burger.png';
export const logoSmallSticky = '/logo_small_sticky.png';
export const projectStaticPath = '/project/';
export const getProjectImage = (name) => {
  return projectStaticPath + name;
};

//Base Navigation
export const navigation = [
  {
    id: 1,
    href: '/preguntas-frecuentes',
    name: 'Preguntas frecuentes',
    isHome: false,
  },
  { id: 2, href: '/iniciar-sesion', name: 'Iniciar sesión', isHome: false },
];

//Metatags for the admin
export const baseMetaTags = [
  {
    name: 'title',
    content: 'Base-page',
  },
  {
    name: 'description',
    content: 'base-desc',
  },
];

//The project routes for metatags
export const RoutesMetaTags = [
  {
    pathname: '/[language]',
    page: 'home',
  },
];

//Base for Open Graph Meta Tags, from can be: "base" and "text"
export const OGMetaTagBase = [
  {
    tag: 'og:title',
    from: 'base',
    key: 'title',
  },
  {
    tag: 'og:description',
    from: 'base',
    key: 'description',
  },
  {
    tag: 'og:image',
    useImgURL: true,
    from: 'base',
    key: 'image',
  },
  {
    tag: 'og:type',
    from: 'text',
    data: 'website',
  },
];

export const siderLinks = (role) => {
  switch (role) {
    case 'BusinessSupport':
    case 'SuperAdmin':
      return [
        {
          sectionTitle: 'Organizations',
          links: [
            {
              label: 'List all Organizations',
              url: '/list-organizations',
              icon: <UnorderedListOutlined />,
              submenu: [],
            },
          ],
        },
        {
          sectionTitle: 'Users',
          links: [
            {
              label: 'List all Users',
              url: '/list-users',
              icon: <UserOutlined />,
              submenu: [],
            },
            {
              label: 'New User',
              url: '#',
              icon: <PlusCircleFilled />,
              submenu: [
                {
                  label: 'Add User',
                  url: '/list-users/new-user',
                },
                {
                  label: 'Add by Bulk',
                  url: '/list-users/bulk-import',
                },
              ],
            },
          ],
        },
      ];
      break;
    case 'OrganizationAdmin':
      return [
        {
          sectionTitle: '',
          links: [
            {
              label: 'Manage Users',
              url: '/manage-users',
              icon: <UnorderedListOutlined />,
              submenu: [],
            },
          ],
        },
      ];
      break;
    case 'CorporateService':
      return [
        {
          sectionTitle: 'Services',
          links: [
            {
          sectionTitle: '',
          links: [
            {
              label: 'Manage Users',
              url: '/manage-users',
              icon: <UnorderedListOutlined />,
              submenu: [],
            },
          ],
        },
        {
          sectionTitle: 'Services',
          links: [
            {
              label: 'Audio Conference Room',
              url: '/audio-conference',
              icon: <CustomerServiceFilled />,
              submenu: [],
            },
            /*
            {
              label: 'Web RTC Meeting',
              url: '/meetings',
              icon: <UsergroupAddOutlined />,
              submenu: [],
            },
            */
            {
              label: 'Queue',
              url: '/queues',
              icon: <OrderedListOutlined />,
              submenu: [],
            },
            {
              label: 'Auto - Attendant',
              url: '/auto-attendant',
              icon: <UserOutlined />,
              submenu: [
                // {
                //   label: "Auto - Attendant",
                //   url: "/auto-attendant",
                // },
                // {
                //   label: "Inbound Contact Center",
                //   url: "/contact-center",
                // },
              ],
            },
          ],
        },
        {
          sectionTitle: 'Telephony Features',
          links: [
            /*
            {
              label: 'Call Forwarding',
              url: '/telephony-features/call-forwarding',
              icon: <PhoneFilled />,
              submenu: [],
            },
            */
            {
              label: 'Ring Groups',
              url: '/telephony-features/ring-groups',
              icon: <IconFont type="icon-map" />,
              submenu: [],
            },
            /*
            {
              label: 'Speed Dials',
              url: '/telephony-features/speed-dials',
              icon: <IconFont type='icon-tty' />,
              submenu: [],
            },
            */
            {
              label: 'Call Recordings',
              url: '/telephony-features/call-recordings',
              icon: <IconFont type="icon-mic" />,
              submenu: [],
            },
          ],
        },
      ];
      break;

    case 'EndUser':
      return [
        {
          sectionTitle: '',
          links: [
            {
              label: 'Meetings',
              url: '/meetings',
              icon: <IconFont type="icon-users" />,
              submenu: [],
            },
            {
              label: 'Voice Mail',
              url: '/voice-mail',
              icon: <MailOutlined />,
              submenu: [],
            },
            /*
            {
              label: 'Call Records',
              url: '/call-records',
              icon: <IconFont type='icon-list-alt' />,
              submenu: [],
            },
            */
            /*
            {
              label: 'Conference Room',
              url: '/audio-conference',
              icon: <IconFont type='icon-FontAwesomeheadphones' />,
              submenu: [],
            },
            */
            // {
            //   label: "Termination Entries",
            //   url: "/web-rtc-meeting",
            //   icon: <IconFont type="icon-th" />,
            //   submenu: [],
            // },
            // {
            //   label: "Queues",
            //   url: "/queues",
            //   icon: <IconFont type="icon-th-list" />,
            //   submenu: [],
            // },
          ],
        },
        {
          sectionTitle: 'Telephony Features',
          links: [
            {
              label: 'Call Forwarding',
              url: '/telephony-features/call-forwarding',
              icon: <PhoneFilled />,
              submenu: [],
            },
            {
              label: 'Call Forward Selective',
              url: '/telephony-features/call-forward-selective',
              icon: <ForwardFilled />,
              submenu: [],
            },
            {
              label: 'My Find Me',
              url: '/telephony-features/my-findme',
              icon: <IconFont type="icon-map" />,
              submenu: [],
            },
            /*
            {
              label: 'Speed Dials',
              url: '/telephony-features/speed-dials',
              icon: <IconFont type='icon-tty' />,
              submenu: [],
            },
            */
            /*
            {
              label: 'Call Recordings',
              url: '/telephony-features/call-recordings',
              icon: <IconFont type='icon-mic' />,
              submenu: [],
            },
            */
          ],
        },
      ];
      break;
    default:
      return [];
      break;
  }
};
