import { influencerService } from '@frontend/services'
import { action, observable, runInAction } from 'mobx'
import { AppModel } from '../../models'
import { IInfluencerProps } from '@frontend/constants'
import { map } from 'lodash'

interface ILoadMoreProps {
  moreInfluencers: IInfluencerProps[]
}
export class HomeViewModel {
  appModel: AppModel = null
  @observable suggestedInfluencers: IInfluencerProps[] = []
  @observable isFetching: boolean

  constructor(appModel: AppModel) {
    this.appModel = appModel
  }

  @action
  async getSuggestedInfluencers() {
    this.isFetching = true
    let { data } = await influencerService.suggestInfluencer<
      IInfluencerProps[]
    >()

    if (data && data.length < 9) {
      const newData = await this.loadMoreInfluencer(9 - data.length)
      data = [...data, ...newData]
    }

    runInAction(() => {
      this.isFetching = false
      this.suggestedInfluencers = data
    })
  }

  @action
  async loadMoreInfluencer(limit: number) {
    const { data } = await influencerService.loadMoreInfluencer<
      IInfluencerProps[]
    >(limit)
    return data
  }
}
