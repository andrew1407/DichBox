// Initial showcase data: two users (the first one is signed in on start),
// boxes with every privacy level, text files and images taken from the
// project's own icons. Images are inlined as data URLs (same format the
// server stores them in).
import dichIcon from '../styles/imgs/dich-icon.png?inline';
import fullLogo from '../styles/imgs/full-logo.png?inline';
import folderIcon from '../styles/imgs/folder-icon.png?inline';
import fileIcon from '../styles/imgs/file-icon.png?inline';
import homeIcon from '../styles/imgs/home-icon.png?inline';
import addFileIcon from '../styles/imgs/add-file.png?inline';
import addFolderIcon from '../styles/imgs/add-folder.png?inline';
import trashBinIcon from '../styles/imgs/trash-bin.png?inline';
import searchIcon from '../styles/imgs/search.png?inline';
import boxMoreIcon from '../styles/imgs/box-more.png?inline';
import defaultUserLogo from '../styles/imgs/default-user-logo.png?inline';

const daysAgo = (days, hours = 0) => new Date(
  Date.now() - (days * 24 + hours) * 3600 * 1000
).toISOString();

const dir = (children = {}) => ({ type: 'dir', children });
const file = content => ({ type: 'file', content });

const readme = `# Welcome to DichBox

This is a **static showcase** of the DichBox browser client.
There is no server behind it: every request is answered by an
in-browser imitation of the API, and all data lives in memory.

Reload the page and everything returns to this initial state.

Things to try:
  * open files from the "notes", "code" and "images" folders;
  * press the edit button, change a text file and save it;
  * add files, folders or upload your own image;
  * rename / remove entries;
  * edit this box (name, colors, privacy, logo, editors);
  * create a new box, follow/unfollow users, read notifications;
  * sign out and sign in as the second user (credentials are in
    the demo banner).
`;

const todo = `TODO
----
[x] create a box
[x] upload some images
[ ] invite box_friend as an editor
[ ] write more notes
`;

const ideas = `## Ideas

- Boxes are storages with their own privacy level:
  public, private, followers or limited.
- Limited boxes are visible only to the chosen users.
- Editors can change files of other users' boxes.
`;

const helloJs = `const greet = name => \`Hello, \${name}! Welcome to DichBox.\`;

console.log(greet('world'));
`;

const config = `{
  "name": "welcome",
  "accessLevel": "public",
  "editors": [],
  "showcase": true
}
`;

const createSeed = () => {
  const users = [
    {
      id: 1,
      name: 'dich_tester',
      name_color: '#00d9ff',
      email: 'tester@dichbox.demo',
      passwd: 'tester123',
      followers: 1,
      reg_date: daysAgo(30),
      description: 'Signed in demo account. All changes reset on page reload.',
      description_color: '#00ff4c',
      user_uid: '5f1c7a0e-demo-4d1c-9a3e-dichtester01',
      logo: dichIcon
    },
    {
      id: 2,
      name: 'box_friend',
      name_color: '#ff9f1c',
      email: 'friend@dichbox.demo',
      passwd: 'friend123',
      followers: 1,
      reg_date: daysAgo(21),
      description: 'Second demo user. Shares a few boxes with dich_tester.',
      description_color: '#ffd166',
      user_uid: '8b2d4e6f-demo-4a7b-8c9d-boxfriend002',
      logo: defaultUserLogo
    }
  ];

  const boxes = [
    {
      id: 1, owner_id: 1, name: 'welcome', access_level: 'public',
      name_color: '#00ff4c', description: 'Start here: text files, folders and images.',
      description_color: '#00d9ff', reg_date: daysAgo(29), last_edited: daysAgo(0, 2),
      logo: fullLogo
    },
    {
      id: 2, owner_id: 1, name: 'secret_stash', access_level: 'private',
      name_color: '#ff4d6d', description: 'Only the owner can see this box.',
      description_color: '#00d9ff', reg_date: daysAgo(20), last_edited: daysAgo(3),
      logo: null
    },
    {
      id: 3, owner_id: 1, name: 'for_friend', access_level: 'limited',
      name_color: '#c77dff', description: 'Limited box: visible to box_friend only.',
      description_color: '#00d9ff', reg_date: daysAgo(15), last_edited: daysAgo(5),
      logo: homeIcon
    },
    {
      id: 4, owner_id: 2, name: 'gallery', access_level: 'public',
      name_color: '#ff9f1c', description: 'DichBox icons collection.',
      description_color: '#ffd166', reg_date: daysAgo(18), last_edited: daysAgo(1),
      logo: boxMoreIcon
    },
    {
      id: 5, owner_id: 2, name: 'followers_club', access_level: 'followers',
      name_color: '#06d6a0', description: 'Visible for followers of box_friend.',
      description_color: '#ffd166', reg_date: daysAgo(12), last_edited: daysAgo(4),
      logo: null
    },
    {
      id: 6, owner_id: 2, name: 'team_project', access_level: 'private',
      name_color: '#118ab2', description: 'Private box where dich_tester is an editor.',
      description_color: '#ffd166', reg_date: daysAgo(10), last_edited: daysAgo(0, 6),
      logo: null
    },
    {
      id: 7, owner_id: 2, name: 'friend_private', access_level: 'private',
      name_color: '#ef476f', description: 'Nobody else can see it.',
      description_color: '#ffd166', reg_date: daysAgo(8), last_edited: daysAgo(8),
      logo: null
    }
  ];

  const storage = {
    1: dir({
      'README.md': file(readme),
      notes: dir({
        'todo.txt': file(todo),
        'ideas.md': file(ideas)
      }),
      code: dir({
        'hello.js': file(helloJs),
        'config.json': file(config)
      }),
      images: dir({
        'dich-icon.png': file(dichIcon),
        'full-logo.png': file(fullLogo),
        'folder-icon.png': file(folderIcon)
      })
    }),
    2: dir({
      'diary.txt': file('Dear diary,\nthis box is private, so nobody else can read it.\n')
    }),
    3: dir({
      'shared-notes.txt': file('Hi box_friend!\nThis box is limited and visible only to you.\n'),
      'home-icon.png': file(homeIcon)
    }),
    4: dir({
      'readme.txt': file('Some icons used by the DichBox interface.\n'),
      'add-file.png': file(addFileIcon),
      'add-folder.png': file(addFolderIcon),
      'trash-bin.png': file(trashBinIcon),
      'search.png': file(searchIcon),
      'file-icon.png': file(fileIcon)
    }),
    5: dir({
      'club-rules.txt': file('1. Follow box_friend.\n2. Enjoy the followers-only content.\n')
    }),
    6: dir({
      'plan.md': file('# Team project\n\ndich_tester is an editor of this box,\nso these files can be changed and saved.\n'),
      src: dir({
        'main.js': file('export const sum = (a, b) => a + b;\n')
      })
    }),
    7: dir({
      'private.txt': file('Hidden from everyone except box_friend.\n')
    })
  };

  const notifications = [
    { id: 1, person_id: 1, type: 'helloMsg', param: -1, extra_values: null, note_date: daysAgo(30) },
    { id: 2, person_id: 2, type: 'helloMsg', param: -1, extra_values: null, note_date: daysAgo(21) },
    { id: 3, person_id: 2, type: 'viewerAdd', param: 3, extra_values: null, note_date: daysAgo(15) },
    { id: 4, person_id: 1, type: 'editorAdd', param: 6, extra_values: null, note_date: daysAgo(10) },
    { id: 5, person_id: 1, type: 'boxAdd', param: 4, extra_values: null, note_date: daysAgo(18) }
  ];

  return {
    loggedInId: 1,
    ids: { users: 2, boxes: 7, notifications: 5 },
    users,
    boxes,
    storage,
    notifications,
    subscribers: [
      { person_id: 1, subscription: 2 },
      { person_id: 2, subscription: 1 }
    ],
    limited: [{ box_id: 3, person_id: 2 }],
    editors: [{ box_id: 6, person_id: 1 }]
  };
};

export default createSeed;
