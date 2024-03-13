const crypto = require("crypto");
const axios = require("axios");
const https = require("https");

async function fetchPage() {
  console.log("hi");

  const url = "https://service.wadiz.kr/api/search/funding";
  try {
    const requestData = {
      startNum: 1,
      order: "recommend",
      limit: 20,
      categoryCode: "",
      endYn: "",
    };

    const makePostRequest = (url, data) => {
      return axios.post(url, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
          secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        }),
      });
    };

    function postDBCampaign(data) {
      return axios.post("http://localhost:8000/api/campaign", data);
    }
    function postDBComment(data) {
      return axios.post(
        `http://localhost:8000/${data.campaignId}/comment`,
        data
      );
    }

    const makeGetRequest = (url) => {
      return axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    };

    const response = await makePostRequest(url, requestData);

    const itemData = response.data.data.list.map((item) => ({
      campaignId: item.campaignId,
      categoryName: item.categoryName,
      title: item.title,
      userId: item.userId,
      totalBackedAmount: item.totalBackedAmount,
      photoUrl: item.photoUrl,
      coreMessage: item.coreMessage,
      whenOpen: item.whenOpen,
      productType: item.productType,
      achievementRate: item.achievementRate,
    }));

    console.log(itemData.length);
    let commentList;

    for (const item of itemData) {
      const PostCampaignResponse = await postDBCampaign(item);
      const item_url = `https://www.wadiz.kr/web/reward/api/comments/campaigns/${item.campaignId}?page=0&size=20&commentGroupType=CAMPAIGN&rewardCommentType=`;

      const itemResponse = await makeGetRequest(item_url);

      commentList = itemResponse.data.data.content.map((comment) => ({
        body: comment.body.trim(),
        campaignId: comment.commonId,
        commentType: comment.commentType,
        nickName: comment.nickName,
        whenCreated: comment.whenCreated,
        commentReplys: comment.commentReplys,
        depth: comment.depth,
      }));
      const PostCommentResponse = await postDBComment(commentList);

      console.log(PostCampaignResponse);
      console.log(PostCommentResponse);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchPage();
