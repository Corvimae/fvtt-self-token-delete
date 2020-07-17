Hooks.on('ready', () => {
  document.body.addEventListener('keydown', event => {
    if (event.key === 'Backspace' && document.activeElement?.tagName === 'BODY') {
      game.socket.emit('module.self-token-delete', {
        event: 'request-deletion',
        tokens: canvas.tokens.controlled.filter(token => token.owner).map(token => ({
          id: token.id,
          sceneId: token.scene.id,
        })),
      });
    }
  });

  game.socket.on('module.self-token-delete', async data => {
    if (data.event === 'request-deletion' && game.user.isGM) {
      await Promise.all(data.tokens.map(async ({ id, sceneId }) => {
        const scene = game.scenes.get(sceneId).deleteEmbeddedEntity("Token", id);
      }));
    }
  });
});
