
/* ------------- loadAvatar(user)--------------

If we have a database with users, and if users have assigned avatars, we could write a 'loadAvatar' function that loads the user's avatar function on the scene.

Example from TranscendVR:
[aframeComponents/scene-load.js]
They wrote an a-frame component called 'scene-load' which ensures the scene loads before anything
else can happen. This component dispatches a 'setAsLoaded' reducer to the store and emits a 'sceneLoad' 
message via a socket connection to the server.

[browser/socket.js] 
Upon receiving this 'sceneLoad' message, the server emits a 'renderAvatar' message with the current 
user. Upon receiving this message, the browser calls 'putUserOnDom' which loads the user's avatar:

    import './aframeComponents/fps-look-controls';

    // putUserOnDom performs local filtering to make sure the user is in the same
    // A-Frame room and perfoms an initial render of their avatar if they are

    export function putUserOnDOM (user) {
    console.log(`Putting user ${user} on the DOM`);
      if (user.scene === window.location.pathname.replace(/\//g, '') || 'root') {
        const scene = document.getElementById('scene');
        const head = document.createElement('a-minecraft');

        // Just in case a user doesn't have a skin associated with their user, use 3djesus
        const skin = user.skin || '3djesus';
        head.setAttribute('skin', skin);
        scene.appendChild(head);
        head.setAttribute('id', user.id);
        head.setAttribute('minecraft-nickname', user.displayName);
        head.setAttribute('minecraft', `skinUrl: ../../images/${skin}.png;`);
        head.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
        head.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
        return head;
      }
    }

------------------------------------------- */
