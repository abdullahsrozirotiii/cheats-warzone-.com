const storagePrefix = 'warzonecheats-forum-vote:';

export function initForumVotes(): void {
  document.querySelectorAll<HTMLElement>('[data-forum-card], [data-forum-vote]').forEach((post) => {
    const slug = post.dataset.postSlug ?? post.dataset.forumCardSlug;
    const count = post.querySelector<HTMLElement>('[data-vote-count]');
    const upvote = post.querySelector<HTMLButtonElement>('[data-vote-up]');
    if (!slug || !count || !upvote) return;
    const upvoteLabel = upvote.getAttribute('aria-label') ?? 'Upvote this discussion';
    const removeLabel = upvote.getAttribute('data-vote-remove-label') ?? 'Remove your upvote';

    let hasVoted = false;
    try {
      hasVoted = window.localStorage.getItem(`${storagePrefix}${slug}`) === 'up';
    } catch {
      // The control still works for the current page when browser storage is unavailable.
    }

    const baseCount = Number(post.dataset.upvotes ?? count.textContent ?? 0) || 0;
    const render = () => {
      count.textContent = String(baseCount + (hasVoted ? 1 : 0));
      upvote.classList.toggle('is-upvoted', hasVoted);
      upvote.setAttribute('aria-pressed', String(hasVoted));
      upvote.setAttribute('aria-label', hasVoted ? removeLabel : upvoteLabel);
    };

    upvote.addEventListener('click', () => {
      hasVoted = !hasVoted;
      try {
        if (hasVoted) window.localStorage.setItem(`${storagePrefix}${slug}`, 'up');
        else window.localStorage.removeItem(`${storagePrefix}${slug}`);
      } catch {
        // Keep the updated count for this page view when browser storage is unavailable.
      }
      render();
    });

    render();
  });
}
