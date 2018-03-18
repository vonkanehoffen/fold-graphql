import _ from 'lodash'
import {devOwnerId} from './config'

export const slugify = s => s.replace(/ +/g, '-').toLowerCase()
export const getOwnerId = context => _.get(context.event, ['requestContext', 'authorizer', 'claims', 'cognito:username'], devOwnerId)