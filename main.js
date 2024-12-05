try {
  function loadMore() {
    const loadMoreBtn = document.querySelector('div>button._abl->div._abm0>svg[aria-label="Load more comments"');
    if (loadMoreBtn) {
      loadMoreBtn.parentElement.click()
      console.log(`Logging: there has more comments, loading more...${new Date().toString()}`);
      setTimeout(() => {
        loadMore();
      }, 4000);
    } else {
      console.log("Logging: all comments loaded.");
      handleCommentData();
    }
  }
  loadMore();
  const comments = [];
  const postInfo = { name: "", desc: "" };
  function collectPostInfo() {
    const postInfoConatiner = document.querySelector('li._a9zj._a9zl._a9z5');
    const name = postInfoConatiner?.querySelector('h2._a9zc')?.innerText;
    const desc = postInfoConatiner?.querySelector('div._a9zs')?.innerText;
    postInfo.name = name;
    postInfo.desc = desc;
  }
  async function collectTheComments() {
    collectPostInfo();
    document.querySelectorAll('ul._a9ym,ul._a9yo').forEach((e) => {
      const commentContainer = e?.querySelector('div._a9zr');
      const name = commentContainer?.querySelector('h3._a9zc')?.innerText;
      const comment = commentContainer?.querySelector('div._a9zs')?.innerText;
      comments.push({ name, comment });
    });
const finalResult = `
[------This Ins post info is------]
[[author]]: ${postInfo.name}
[[post body content]]:
${postInfo.desc}
[------List of all comments(${comments.length} totals)------]
${comments.map(c => `[[@${c.name} says]]: ${c.comment || '(Just media content)'}`).join('\n')}
`;
    console.log(finalResult);
    comments.splice(0);
  }
  function handleCommentData() {
    document.querySelectorAll('ul._a9ym').forEach((e) => {
      const replyBtn = e?.querySelector('button._acan._acao._acas._aj1-._ap30');
      if (replyBtn && !replyBtn.innerText.includes("Hide")) {
        replyBtn.click();
        console.log("Logging: There has reply comments, loading.");
      }
    });
    setTimeout(() => {
      collectTheComments();
    }, 4000);
  }
  
} catch (error) {
  console.error("Error logging:\n", error);
}
