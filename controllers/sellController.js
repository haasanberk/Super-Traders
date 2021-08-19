const { user, share, share_owner, logs } = require('../models');

exports.sellShare = async function (req, res, next) {
  if (req.body == null) {
    res.status(400).json('Body cannot be empty');
  }

  const { userId, shareCode, sellQuantity } = req.body;
  //body check
  if (!userId || !shareCode || !sellQuantity) {
    return res.status(400).json({
      status: 400,
      message: 'Please include userId, shareCode and buyQuantity into body',
    });
  }

  //user check
  let findUser = await user.findOne({
    where: { id: userId },
  });
  if (findUser == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'User could not found' });
  }

  //share check
  let findShare = await share.findOne({
    where: { code: shareCode },
  });
  if (findShare == null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Share could not found' });
  }

  let shareRate = await share.findOne({
    where: { code: shareCode },
  });

  //own check
  let isOwn = await share_owner.findOne({
    where: { ownerId: userId, shareCode: shareCode },
  });

  if (isOwn == null) {
    return res
      .status(400)
      .json({ status: 400, message: 'User does not own this share' });
  }
  const ownQuantity = isOwn.dataValues.quantity;
  const userBudget = parseFloat(findUser.dataValues.budget);
  const totalPrice = parseFloat(shareRate.dataValues.rate * sellQuantity);

  if (ownQuantity < sellQuantity) {
    return res.status(400).json({
      status: 400,
      message: 'User does not own as many shares as she wants to sell',
    });
  } else {
    //quantity update
    await share_owner.update(
      { quantity: ownQuantity - sellQuantity },
      {
        where: {
          ownerId: userId,
          shareCode: shareCode,
        },
      }
    );

    //budget update
    await user.update(
      { budget: totalPrice + userBudget },
      {
        where: {
          id: userId,
        },
      }
    );
    //LOG
    try {
      await logs.create({
        transaction: 'sell',
        ownerId: userId,
        shareCode: shareCode,
        quantity: sellQuantity,
        price: shareRate.dataValues.rate,
      });
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  return res
    .status(200)
    .json({ status: 200, message: 'Sell transaction successful' });
};
