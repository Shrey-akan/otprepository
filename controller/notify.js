import { Notification } from "../model/messagemodel.js";

export const sendMessage = async (req, res) => {
  const { to, from, message } = req.body;

  if (!to && !from && !message) {
    return res.status(400).json({
      messageSent: false,
    });
  }

  try {
    const newMessage = new Notification({
      to: to,
      from: from,
      message: message,
      read: false,
    });

    newMessage.save();

    return res.status(200).json({
      messageSent: true,
      messageUid: newMessage._id.toString(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      messageSent: false,
    });
  }
};

export const receiveMessage = async (req, res) => {
  // or extract user's id or email from cookie
  const { from } = req.body;

  if (!from) {
    return res.status(400).json({
      messageFetched: false,
    });
  }

  try {
    const fetchedMessages = await Notification.find({ from: from });
    if (!fetchedMessages) {
      return res.status(400).json({
        messageFetched: false,
      });
    }

    return res.status(200).json({
      messagesFetched: true,
      messages: fetchedMessages,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      messageFetched: false,
    });
  }
};

export const deleteMessage = async (req, res) => {
  const { msgUid } = req.body;

  if (!msgUid) {
    return res.status(400).json({
      msgDeleted: false,
    });
  }

  try {
    await Notification.deleteOne({ _id: msgUid });

    return res.status(200).json({
      msgDeleted: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msgDeleted: false,
    });
  }
};

export const readMessage = async (req, res) => {
  const { msgUid } = req.body;

  if (!msgUid) {
    return res.status(400).json({
      msgRead: false,
    });
  }

  try {
    await Notification.updateOne({ _id: msgUid }, { read: true });

    return res.status(200).json({
      msgRead: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msgRead: false,
    });
  }
};
