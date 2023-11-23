import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HomeController } from './home/home.controller';
import { CreateController } from './create/create.controller';
import { AccountController } from './account/account.controller';
import { MessagesController } from './messages/messages.controller';
import { NotificationsController } from './notifications/notifications.controller';
import { ProfileController } from './profile/profile.controller';
import { SearchController } from './search/search.controller';
import { SettingsController } from './settings/settings.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    HomeController,
    CreateController,
    AccountController,
    MessagesController,
    NotificationsController,
    ProfileController,
    SearchController,
    SettingsController,
  ],
  providers: [],
})
export class AppModule {}
