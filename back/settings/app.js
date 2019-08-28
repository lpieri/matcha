/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 13:22:45 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/16 12:11:42 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var useragent = require('express-useragent');
const cors = require('cors');
var app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.json({limit: '42mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '42mb', extended: true}))


const UsersRouter = require('../Users/UsersRoutes');
const UsersInfosRouter = require('../UsersInfos/UsersInfosRoutes');
const UsersNotifsRouter = require('../UsersNotifs/UsersNotifsRoutes');
const UsersPhotosRouter = require('../UsersPhotos/UsersPhotosRoutes');
const UsersPopularity = require('../UsersPopularity/UsersPopularityRoutes');
const UsersTagsRouter = require('../UsersTags/UsersTagsRoutes');
const UsersHistoryRouter = require('../UsersHistory/UsersHistoryRoutes')
const UsersTokenRouter = require('../UsersToken/UsersTokenRoutes')
const UsersBlockRouter = require('../UsersBlock/UsersBlockRoutes')
const TagsRouter = require('../Tags/TagsRoutes');
const SearchRouter = require('../Search/SearchRoutes');
const LikesRouter = require('../Likes/LikesRoutes');
const FakeAccountsRouter = require('../FakeAccounts/FakeAccountsRoutes')
const UsersChatRouter = require('../UsersChat/UsersChatRoutes')
const generator = require('../utils/generator')


app.use(cors());
app.use(useragent.express());
app.use('/users', UsersRouter);
app.use('/users-infos', UsersInfosRouter);
app.use('/users-notifs', UsersNotifsRouter);
app.use('/users-photos', UsersPhotosRouter);
app.use('/users-popularity', UsersPopularity);
app.use('/users-tags', UsersTagsRouter);
app.use('/users-history', UsersHistoryRouter);
app.use('/users-token', UsersTokenRouter);
app.use('/users-block', UsersBlockRouter);
app.use('/tags', TagsRouter);
app.use('/search', SearchRouter);
app.use('/likes', LikesRouter);
app.use('/fake-account', FakeAccountsRouter);
app.use('/users-chat', UsersChatRouter);
app.use('/generator', generator);


app.options('*', cors());



module.exports = app;