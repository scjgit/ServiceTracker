/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//  BaseChallengeHandler.h
//  WorklightStaticLibProject
//
//  Created by Ishai Borovoy on 9/12/12.
//
//  Base class for all challenge handlers.
//

#import <Foundation/Foundation.h>
#import "WLResponse.h"

@class WLRequest;

@interface BaseChallengeHandler : NSObject {
    @private
    NSString *realm;
    WLRequest *activeRequest;
    NSMutableArray *waitingRequestsList;
}

@property (nonatomic, retain) NSString *realm;
@property (atomic, retain) WLRequest *activeRequest;
@property (atomic, retain) NSMutableArray *waitingRequestsList;

-(id) initWithRealm: (NSString *) iRealm;
-(void) handleChallenge: (NSDictionary *)challenge;
-(void) submitFailure: (WLResponse *)challenge;

-(void) releaseWaitingList;
-(void) clearWaitingList;

@end
