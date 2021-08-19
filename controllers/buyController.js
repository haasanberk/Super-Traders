const { user, share, share_owner, logs } = require('../models');

exports.buyShare = async function (req, res, next) {
  if (req.body == null) {
    res.status(400).json('Body cannot be empty');
  }

  const { userId, shareCode, buyQuantity } = req.body;
  //body check
  if (!userId || !shareCode || !buyQuantity) {
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

  //budget check
  let shareRate = await share.findOne({
    where: { code: shareCode },
  });
  const userBudget = parseFloat(findUser.dataValues.budget);
  const totalPrice = parseFloat(shareRate.dataValues.rate * buyQuantity);

  if (totalPrice > userBudget) {
    return res
      .status(404)
      .json({ status: 400, message: 'Insufficient budget' });
  }

  let isOwn = await share_owner.findOne({
    where: { ownerId: userId, shareCode: shareCode },
  });

  //budget update
  await user.update(
    { budget: userBudget - totalPrice },
    {
      where: {
        id: userId,
      },
    }
  );

  if (isOwn == null) {
    //create ownership
    try {
      const newShareOwner = await share_owner.create({
        ownerId: userId,
        shareCode: shareCode,
        quantity: buyQuantity,
      });
      console.log(newShareOwner);
    } catch (error) {
      console.log('Error: ' + error);
    }
  } else {
    //update ownership quantity
    const ownQuantity = isOwn.dataValues.quantity;
    await share_owner.update(
      { quantity: ownQuantity + buyQuantity },
      {
        where: {
          ownerId: userId,
          shareCode: shareCode,
        },
      }
    );
  }

  //log
  try {
    await logs.create({
      transaction: 'buy',
      ownerId: userId,
      shareCode: shareCode,
      quantity: buyQuantity,
      price: shareRate.dataValues.rate,
    });
  } catch (error) {
    console.log('Error: ' + error);
  }

  return res.status(200).json({ status: 200, message: 'Purchase successful' });
};
